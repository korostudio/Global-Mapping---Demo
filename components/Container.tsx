import { ReactNode, CSSProperties } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Container({ children, className = "", style }: Props) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1280px",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "clamp(24px, 4vw, 48px)",
        paddingRight: "clamp(24px, 4vw, 48px)",
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
