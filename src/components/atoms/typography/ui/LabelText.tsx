type Props = {
	className?: string;
	children: React.ReactNode;
};

const LabelText = ({ className, children }: Props) => {
	return (
		<span
			className={`font-medium text-sm leading-4.5 tracking-[0.025rem] font-ibm-plex-sans ${className}`}
		>
			{children}
		</span>
	);
}

export default LabelText;
