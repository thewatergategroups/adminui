import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
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
};

export default Dashboard;
