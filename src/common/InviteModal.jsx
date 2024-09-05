import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config/default.json";
import { showToastMessage } from "@/utils/showToastNavigate";
import BtnLoader from "./BtnLoader";
import { DialogTrigger } from "@radix-ui/react-dialog";

export function InviteModal({ isOpen, setIsOpen }) {

  const [loading, setLoading] = useState(false);
  const [roleIds, setroleIds] = useState([]);
  const [formData, setFormData] = useState({
    inviteeEmail: "",
    roleId: "",
  });

  const [error, setError] = useState({
    inviteeEmail: "",
    roleId: "",
  });

  const fetchroleIds = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/roles`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setroleIds(response.data.data.roles);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchroleIds();
  }, []);

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@barcadlyservices\.in$/;

    if (formData.inviteeEmail && !regex.test(value)) {
      setError((prev) => ({ ...prev, inviteeEmail: "Invalid Email" }));
    } else {
      setError("");
    }
  };

  const handleInvite = async () => {
    const { inviteeEmail, roleId } = formData;
    const regex = /^[a-zA-Z0-9._%+-]+@barcadlyservices\.in$/;

    if (!inviteeEmail) {
      setError((prev) => ({ ...prev, inviteeEmail: "Email is required" }));
      return;
    }
    setLoading(true);
    try {
      if (roleId && inviteeEmail && regex.test(inviteeEmail)) {
        const response = await axios.post(
          `${config.API_URL}/admin/invite`,
          {
            inviteeEmail,
            roleId,
          },
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setFormData(prev => ({...prev, inviteeEmail:"",roleId:""}))
          setIsOpen(false);
        }
      showToastMessage(response?.data);
      }
    } catch (err) {
      showToastMessage(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button>Invite</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Peoples</DialogTitle>
          <DialogDescription>you can choose email and role</DialogDescription>
        </DialogHeader>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            onBlur={() => validateEmail(formData.inviteeEmail)}
            onChange={(e) =>
              setFormData({ ...formData, inviteeEmail: e.target.value })
            }
            placeholder="m@example.com"
            required
          />
          {error?.inviteeEmail && (
            <div className="text-red-600 text-sm">{error?.inviteeEmail}</div>
          )}{" "}
        </div>
        <Label htmlFor="role">Roles</Label>
        <Select
          id="role"
          value={formData.roleId}
          onValueChange={(value) => setFormData({ ...formData, roleId: value })}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {roleIds?.map((roles) => (
              <SelectItem key={roles._id} value={roles._id}>
                {roles.roleName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogFooter className="flex space-x-2">
          <Button
            type="button"
            variant={"ghost"}
            size="sm"
            onClick={() => setIsOpen(false)}
            className="px-3 flex-1 border"
          >
            Cancel
          </Button>

          <Button
            onClick={() => handleInvite()}
            className="px-3 flex-1"
            size="sm"
            type="submit"
          >
            {loading ? <BtnLoader /> : "Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
