import React, { useState, ChangeEvent } from 'react';
import { ActionIcon, TextInput, Button, MultiSelect, rem, Drawer } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { User } from "../../logic/types"
import { patchUser } from "../../logic/api"
// Props for EditUser Component
interface EditUserProps {
  user: User;
}

const EditUser: React.FC<EditUserProps> = ({ user }) => {
  const [opened, setOpened] = useState(false);
  const [userData, setUserData] = useState<User>(user);

  const handleSubmit = async () => {
    await patchUser(userData)
    console.log("closed")
    setOpened(false)
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRolesChange = (roles: string[]) => {
    setUserData({ ...userData, roles });
  };


  return (
    <>
      <ActionIcon variant="subtle" color="blue" onClick={() => {
        console.log("setting to opened")
        setOpened(true)}}>
        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      </ActionIcon>

      <Drawer
        opened={opened}
        onClose={() => {
            console.log("closed")
            setOpened(false)}}
        title="Edit User"
        padding="md"
        position="left"
        size="md"
      >
        <TextInput
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="First Name"
          name="first_name"
          value={userData.first_name}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Surname"
          name="surname"
          value={userData.surname}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Date of Birth"
          name="dob"
          value={userData.dob}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Postcode"
          name="postcode"
          value={userData.postcode}
          onChange={handleInputChange}
          required
        />
        <MultiSelect
          label="Roles"
          data={['admin', 'standard', 'readonly']}
          value={userData.roles}
          onChange={handleRolesChange}
        />
        <Button onClick={handleSubmit}>Save Changes</Button>
      </Drawer>
    </>
  );
};

export default EditUser;
