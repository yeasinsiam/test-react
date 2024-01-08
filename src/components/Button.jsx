export default function Button({ variant, children, prefix, onClick }) {
  variant = variant ?? "primary";
  children = children ?? "Button";

  return (
    <button className={`btn btn-${variant ?? "primary"}`} onClick={onClick}>
      {prefix} {children}
    </button>
  );
}
