import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface DashboardProps {
  onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps) {
  return (
    <div>
      <Typography variant="h4" gutterBottom color="black">
        Welcome
      </Typography>
      <Button variant="contained" color="primary" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
