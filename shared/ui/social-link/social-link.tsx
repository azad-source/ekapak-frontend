interface IProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export function SocialLink({ href, icon, label }: IProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="hover:opacity-80"
    >
      {icon}
    </a>
  );
}
