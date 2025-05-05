interface Props {
  href: string;
  children: string;
}

export function Link({href, children}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
