import { Typography } from "@material-ui/core";

export default function Header({ title }) {
  return (
    <Typography
      style={{
        fontSize: "24px",
        fontWeight: "bolder",
      }}
    >
      {title}
    </Typography>
  );
}
