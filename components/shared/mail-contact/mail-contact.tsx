import { MailIcon } from "../icons/mail-icon";

interface IProps {
  email: string;
  isMobile?: boolean;
}

export const MailContact: React.FC<IProps> = ({ email, isMobile = false }) => {
  const desktopCls =
    "flex gap-2.5 items-center hover:opacity-80 transition-opacity";

  return (
    <a
      href={`mailto:${email}`}
      className={isMobile ? "header-mobile-btn" : desktopCls}
    >
      <MailIcon />
      {!isMobile && <span className="text-sm">{email}</span>}
    </a>
  );
};
