import React from 'react';
import { Modal, Text, Group, Button } from '@mantine/core';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
    .mantine-Modal-inner {
        right: 0;
    }
    .mantine-Modal-body,
    .mantine-Modal-body > form {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }
`;

interface ConfirmDeleteModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ opened, onClose, onConfirm }) => {
  return (
    <StyledModal opened={opened} onClose={onClose} title="Confirm Deletion">
      <Text>Are you sure you want to delete this item?</Text>
      <Group mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Delete
        </Button>
      </Group>
    </StyledModal>
  );
};

export default ConfirmDeleteModal;
