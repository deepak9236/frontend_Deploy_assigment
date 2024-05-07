import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InstanceService from "../services/InstanceService";

const Container = styled.div`
  margin: 20px;
`;

const Title = styled.h2`
  color: #333;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const InstanceManagement = () => {
  const [instances, setInstances] = useState([]);
  const [newInstance, setNewInstance] = useState({
    name: "",
    host: "",
    port: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const bearerToken = localStorage.getItem("accessToken");
      const data = await InstanceService.getInstances(bearerToken);
      setInstances(data);
    } catch (error) {
      console.error("Error fetching instances:", error);
      // You can set an error message state here if needed
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInstance((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddInstance = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const bearerToken = localStorage.getItem("accessToken");
      await InstanceService.addInstance(newInstance, bearerToken);
      fetchData();
      setNewInstance({
        name: "",
        host: "",
        port: "",
      });
    } catch (error) {
      console.error("Error adding instance:", error);
      // You can set an error message state here if needed
    }
  };

  return (
    <Container>
      <Title>Instance Management</Title>
      <List>
        {instances.map((instance) => (
          <ListItem key={instance._id}>
            {instance.name} - {instance.host}:{instance.port} -{" "}
            {instance.numDatabases} databases - {instance.numUsers} users
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleAddInstance}>
        <input
          type="text"
          name="name"
          value={newInstance.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
        <input
          type="text"
          name="host"
          value={newInstance.host}
          onChange={handleChange}
          placeholder="Enter host"
          required
        />
        <input
          type="number"
          name="port"
          value={newInstance.port}
          onChange={handleChange}
          placeholder="Enter port"
          required
        />
        <button type="submit">Add Instance</button>
      </form>
    </Container>
  );
};

export default InstanceManagement;
