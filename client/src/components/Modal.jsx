import React, { useRef, useState } from "react";
import { useEffect } from "react";

const Modal = ({ socket, showModal, setShowModal, selectedItemId }) => {
	// console.log(selectedItemId)
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState([]);
	const modalRef = useRef();

	const closeModal = (e) => {
		if (modalRef.current === e.target) {
			setShowModal(!showModal);
		}
	};

	const addComment = (e) => {
		e.preventDefault();
		socket.emit("updateComment", {
			todoID: selectedItemId,
			comment,
			user: localStorage.getItem("_username"),
		});
		setComment("");
	};

	useEffect(() => {
		socket.on("commentsReceived", (todo) => setComments(todo.comments));
	}, [socket]);

	// console.log(comments)

	return (
		<div className="modal" onClick={closeModal} ref={modalRef}>
			<div className="modal__container">
				<h3>Comments</h3>

				<form className="comment__form" onSubmit={addComment}>
					<input
						className="comment__input"
						type="text"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						required
					/>

					<button>Add Comment</button>
				</form>

				<div className="comments__container">
					{comments.length > 0 ? (
						comments.map((item, index) => (
							<div className="comment" key={index}>
								<p>
									<strong>{item.name} - </strong> {item.text}
								</p>
							</div>
						))
					) : (
						<p>No comments available yet...</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
