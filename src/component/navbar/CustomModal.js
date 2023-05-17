import { Modal, Box, Select } from "@mantine/core";

function CustomModal({ isOpen, onClose, children, action, title }) {
	const resTitle =
		action && title
			? `${action} ${title}`
			: action
			? action
			: title
			? title
			: "Modal";

	return (
		<>
			<Modal
				opened={isOpen}
				onClose={onClose}
				title={resTitle}
				overlayProps={{
					opacity: 0.55,
					blur: 3,
				}}
				styles={{
					overlay: {
						backgroundColor: "rgba(128, 128, 128, 0.1)",
					},
				}}
			>
				{children}
			</Modal>
		</>
	);
}

export default CustomModal;
