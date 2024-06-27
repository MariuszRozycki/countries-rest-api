type InputFormValueProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
}

function InputFormValue({inputValue, setInputValue}: InputFormValueProps) {
  return (
    <input
      className="p-1"
      type="text"
      placeholder="Type filter value"
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value)      
      }}
    />
  )
}

export default InputFormValue;
