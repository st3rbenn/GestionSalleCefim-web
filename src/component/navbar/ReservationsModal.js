import { Modal, Box, Select } from '@mantine/core';


function EditReservationModal({ isOpen, onClose }) {

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={onClose}
        title="Modifier la reservation"
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        styles={{
          overlay: {
            backgroundColor: 'rgba(128, 128, 128, 0.1)',
          },
        }}>
        <Box>
          <Select
            label="Debut"
            placeholder="Pick one"
            searchable
            nothingFound="No options"
            data={['React', 'Angular', 'Svelte', 'Vue']}
          />
          <Select
            label="Fin"
            placeholder="Pick one"
            searchable
            nothingFound="No options"
            data={['React', 'Angular', 'Svelte', 'Vue']}
          />
        </Box>
      </Modal>
    </>
  );
}



export default EditReservationModal;

