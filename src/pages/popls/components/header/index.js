import { Typography } from "@material-ui/core";

export default function Header({ title }) {
  return (
    <Typography variant="h5" style={{ fontWeight: 700 }}>
      {title}
    </Typography>
  );
}
