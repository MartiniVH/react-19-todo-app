interface Props {
    text: string;
    buttonType: 'button' | 'submit';
    onClick?: () => void;
}

const Button = ({ text, buttonType = 'button', onClick }: Props) => {
  return <button className="text-white bg-purple-500 rounded-3xl px-2 py-1 hover:bg-purple-600 cursor-pointer" type={buttonType} onClick={onClick}>{text}</button>
}

export default Button