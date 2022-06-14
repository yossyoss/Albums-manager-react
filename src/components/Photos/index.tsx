import React, { useState, useEffect } from 'react';

import Presentation from './presentation';
import {Dispatch, RootState} from "../../store/store";
import { useDispatch, useSelector } from 'react-redux'

const Photos = props => {
	const [updateFormPhoto, setUpdateFormPhoto] = useState(null);
	const [isUpdating, setIsUpdating] = useState(null);
	const [createFormShow, setCreateFormShow] = useState(false);
	const [isDeleting, setIsDeleting] = useState(null);

	const photosState = useSelector((state: RootState) => state.photos)
	const dispatch = useDispatch<Dispatch>()

	useEffect(() => {
		// @ts-ignore
		dispatch.photos.SET_IS_LOADING(true)
		// @ts-ignore
		dispatch.photos.getPhotosByAlbumId(props.match.params.id)
		// @ts-ignore
		dispatch.photos.SET_IS_LOADING(false)
	}, [props.match.params.id]);


	const createHandlers = {
		onCreateFormOpen: () => {
			setCreateFormShow(true);
		},

		onCreateFormClose: () => {
			setCreateFormShow(false);
		},

		onCreateFormSubmit: formData => {
			setCreateFormShow(false);
			// @ts-ignore
			dispatch.photos.addPhoto(formData)
		},
	};

	const deleteHandlers = {
		onCardDelete: (delPhoto, index) => () => {
			setIsDeleting(index);
			// @ts-ignore
			dispatch.photos.deletePhoto(delPhoto.id)
			setIsDeleting(null);
		},
	};

	const updateHandlers = {
		onUpdateFormOpen: (photo, index) => () => {
			setUpdateFormPhoto(photo);
			setIsUpdating(index);
		},

		onUpdateFormClose: () => {
			setUpdateFormPhoto(null);
			setIsUpdating(null);
		},
		onUpdateFormSubmit: formData => {
			setUpdateFormPhoto(null);
			// @ts-ignore
			dispatch.photos.updatePhoto({id: updateFormPhoto.id, formData})
			setIsUpdating(null)
		},
	};

	return (
		<Presentation
			photos={photosState.photos}
			updateFormPhoto={updateFormPhoto}
			isUpdating={isUpdating}
			createFormShow={createFormShow}
			isDeleting={isDeleting}
			isLoadingAlbum={photosState.isLoading}
			{...createHandlers}
			{...deleteHandlers}
			{...updateHandlers}
		/>
	);
};

export default Photos;
