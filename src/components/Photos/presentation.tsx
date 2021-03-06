import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { updateIcon, deleteIcon } from '../../services/icons';
import { loadingImageUrl } from '../../services/consts';
import PhotoModal from '../PhotoModal';

const Presentation = props => {
	const {
		photos,
		isUpdating,
		isDeleting,
		isLoadingAlbum,
		onCreateFormOpen,
		updateFormPhoto,
		createFormShow
	} = props

	const cards = photos.map((photo, index) => {
		const title =
			isUpdating === index || isDeleting === index
				? 'Updating ...'
				: photo.title;
		const url =
			isUpdating === index || isDeleting === index
				? loadingImageUrl
				: photo.thumbnailUrl;
		const isDisabled = isUpdating === index || isDeleting === index;


		return (
			<Card key={index}>
				<Card.Img
					variant='top'
					onClick={()=>window.open(photo.url)}
					src={url}
					alt={`Invalid Url for Image #${photo.id}`}
				/>
				<Card.Body>
					<Card.Text>{title}</Card.Text>
					<ButtonGroup>
						<OverlayTrigger
							placement='bottom'
							overlay={<Tooltip id={"Tooltip"}>Update the Photo</Tooltip>}
						>
							<Button
								variant='outline-info'
								onClick={props.onUpdateFormOpen(photo, index)}
								disabled={isDisabled}
							>
								{updateIcon}
							</Button>
						</OverlayTrigger>

						<OverlayTrigger
							placement='bottom'
							overlay={<Tooltip id={"Tooltip"}>Delete the Photo</Tooltip>}
						>
							<Button
								variant='outline-danger'
								onClick={props.onCardDelete(photo, index)}
								disabled={isDisabled}
							>
								{deleteIcon}
							</Button>
						</OverlayTrigger>
					</ButtonGroup>
				</Card.Body>
			</Card>
		);
	});

	let render =
		isLoadingAlbum === true ? (
			<Alert show={true} variant='info' className='text-center'>
				<Alert.Heading>Loading the Current Album</Alert.Heading>
				<div>
					It should take less than a minute to load your Album. Please stick around.
				</div>
				<div>
					If it takes longer than you can go back to the Home Page or reload.
				</div>
				<hr />
				<div className='text-right'>
					<Spinner animation='border' />
				</div>
			</Alert>
		) : cards.length <= 0 ? (
			<Alert show={true} variant='danger' className='text-center'>
				<Alert.Heading>This is an Invalid Album</Alert.Heading>
				<div>
					The Album Id that you have entered is invalid. Please make sure you have
					entered a valid Album Id
				</div>
				<hr />
				<div>
					You can go back to the{' '}
					<Alert.Link as={Link} to='/'>
						Home Page
					</Alert.Link>{' '}
					and try again.
				</div>
			</Alert>
		) : (
			<React.Fragment>
				<Button as={Link} to='/' block variant='dark' className='mb-4'>
					Go back to Home
				</Button>
				<CardColumns>{cards}</CardColumns>
				<Button block variant='primary' onClick={onCreateFormOpen}>
					Create a New Photo
				</Button>
			</React.Fragment>
		);
	return (
		<React.Fragment>
			<Jumbotron>{render}</Jumbotron>
			<PhotoModal
				photo={updateFormPhoto}
				show={updateFormPhoto !== null}
				handleClose={props.onUpdateFormClose}
				handleSubmit={props.onUpdateFormSubmit}
			/>
			<PhotoModal
				show={createFormShow}
				handleClose={props.onCreateFormClose}
				handleSubmit={props.onCreateFormSubmit}
			/>
		</React.Fragment>
	);
};

export default Presentation;
