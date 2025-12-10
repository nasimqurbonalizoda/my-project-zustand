import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Api = "https://689efc1f3fed484cf878a4ca.mockapi.io/users";

const InfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getinfo = async () => {
      try {
        const res = await fetch(`${Api}/${id}`);
        const data = await res.json();
        setInfo(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getinfo();
  }, [id]);

  if (loading) {
      return null
  }
  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Card elevation={4}>
        <CardContent sx={{ pt: 4 }}>
          <Typography variant="h4" component="div" gutterBottom>
            {info.name}
          </Typography>

          <Typography variant="body1" color="text.secondary" gutterBottom>
             {info.age}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Chip
              label={info.status ? "Active" : "Inactive"}
              color={info.status ? "success" : "error"}
              sx={{ fontWeight: "bold" }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
             {info.id}
          </Typography>
        </CardContent>
        
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mt: 4 }}
      >
        Go Back
      </Button>
      </Card>
    </Box>
  );
};

export default InfoPage;