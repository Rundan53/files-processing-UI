import { Label } from "../ui/label";

const Color = ({
  inputRef,
  attribute,
  placeholder,
  attributeType,
  handleInputChange,
}) => (
  <div className='flex flex-col gap-3 w-1/2'>
    <h3 className='text-[10px] uppercase text-white'>{placeholder}</h3>
    <div
      className='flex items-center gap-2 border rounded-md overflow-hidden'
      onClick={() => inputRef.current.click()}
    >
      <input
        type='color'
        value={attribute}
        ref={inputRef}
        onChange={(e) => handleInputChange(attributeType, e.target.value)}
      />
      <Label className='flex-1 text-white'>{attribute}</Label>
      {/* <Label className='flex h-6 w-8 items-center justify-center bg-primary-grey-100 text-[10px] leading-3'>
        90%
      </Label> */}
    </div>
  </div>
);

export default Color;