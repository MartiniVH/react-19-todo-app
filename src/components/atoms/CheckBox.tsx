interface Props {
    isCompleted: boolean;
    onChange: () => void;
    name: string;
}

const CheckBox = ({ isCompleted, onChange, name }: Props) => {
  const test = 'test';
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={onChange}
        name={name}
        className="mr-3 w-4 h-4 rounded-lg accent-purple-600 hover:cursor-pointer"
        aria-label={name}
      />
    </label>
  );
}

export default CheckBox;
