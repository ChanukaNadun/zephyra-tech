

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error: string | null;
  
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder={placeholder}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;
