import { Typography } from "@material-ui/core";

export default function Header({ title }) {
  return (
    <Typography variant="h4" style={{ fontWeight: 800 }}>
      {title}
    </Typography>
  );
}
