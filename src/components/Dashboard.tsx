import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import UserIcon from './userInfoIcon';
interface DashboardProps {
  onLogout: () => void; 
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) =>{
 

  const AppCards = () => {
    const cards = [
      { id: 1, title: 'Argo CD', content: 'Provisioning Applications', externalLink: 'http://10.252.1.0:30000' },
      { id: 2, title: 'Wireguard', content: 'VPN Service', externalLink: 'http://10.252.1.0:31502' },
      { id: 3, title: 'PgAdmin', content: 'Database Management', externalLink: 'http://10.252.1.0:31001' },
      { id: 4, title: 'Auth Api', content: 'Swagger Docs for the Authentication API', externalLink: 'http://10.252.1.0:30100/docs' },
      { id: 5, title: 'Llama Api', content: 'Trading Bot Swagger Docs', externalLink: 'http://10.252.1.0:30200/docs' },
    ];
    return (
      <Grid item container spacing={2} sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
        {cards.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <a href={card.externalLink} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
              <Card sx={{ minHeight: '150px', maxHeight: '150px' }}>
                <CardContent>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography>{card.content}</Typography>
                </CardContent>
              </Card>
            </a>
          </Grid>
        ))}
      </Grid>
    )
  }


  return (
    <Grid container direction="column" spacing={2} style={{ height: '100vh', maxWidth:'100%' }}>
    {/* Header Section */}
      <Grid item container justifyContent="space-between" alignItems="center" sx={{ padding: 2 }}>

        <Typography variant="h4" color="black">Welcome</Typography>
        <UserIcon/>
        <Button onClick={onLogout} variant="contained" color="primary">
          Logout
        </Button>
        <AppCards/>
      </Grid>
    </Grid>
  )
  
};

export default Dashboard