/* eslint-disable camelcase */
import { createModel } from '@rematch/core'
import type { RootModel } from '.'
import client from '../../apis/JsonPlaceholder';


export interface PhotosModel {
	albumId: number
	id: number
	title: string
	thumbnailUrl: string
	url: string
}

type PhotosState = {
	isLoading: boolean,
	photos: PhotosModel[]
}


export const photos = createModel<RootModel>()({
	state: {
		isLoading: false,
		photos: [],
	} as PhotosState,
	reducers: {
		SET_PHOTOS: (state: PhotosState, photos: PhotosModel[]) => {
			return {
				...state,
				photos,
			}
		},
		DELETE_PHOTO: (state: PhotosState, id: number) => {
			const { photos } = state
			const newPhotos = photos.filter(photo => photo.id != id)
			return {
				...state,
				photos: newPhotos
			}
		},
		UPDATE_PHOTO: (state: PhotosState, id: number, formData: PhotosModel) => {
			const { photos } = state
			const { title, url } = formData
			 const newPhotos = photos.map(photo => (photo.id === id ? { ...photo, title, url } : photo));

			return {
				...state,
				photos: newPhotos
			}
		},
		ADD_PHOTO: (state: PhotosState, formData: PhotosModel): any => {
			const { photos } = state
			const { title, url } = formData
			const newPhoto = {...photos[photos.length - 1], title, url}
			newPhoto.id = ++newPhoto.id
			 const newPhotos = [...photos, newPhoto]

			return {
				...state,
				photos: newPhotos
			}
		},
		SET_IS_LOADING: (state: PhotosState, isLoading: boolean) => {
			state.isLoading = isLoading
			return state
		}
	},
	// @ts-ignore
	effects: (dispatch) => {
		const { photos } = dispatch
		return {
			async getPhotosByAlbumId(id: number): Promise<any> {
				const response: any = await client.get(
					'/photos', { params: { albumId: id } }
				)
				const {data}: { data: PhotosModel[] } = await response
				// @ts-ignore
				 photos.SET_PHOTOS(data)
			},
			async deletePhoto(id: number): Promise<any> {
				await client.delete(
					`/photos/${id}`
				)
				// @ts-ignore
				photos.DELETE_PHOTO(id)
			},
			async updatePhoto({id, formData}: {id: number, formData: PhotosModel}): Promise<any> {
				await client.patch(
					`/photos/${id}`, formData
				)
				// @ts-ignore
				photos.UPDATE_PHOTO(id, formData)
			},
			async addPhoto(formData: PhotosModel): Promise<any> {
				await client.post(
					'/photos', formData
				)
				// @ts-ignore
				photos.ADD_PHOTO(formData)
			}
		}

	},
})
