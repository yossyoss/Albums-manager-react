/* eslint-disable camelcase */
import { createModel } from '@rematch/core'
import type { RootModel } from '.'
import client from '../../apis/JsonPlaceholder';


export interface AlbumsModel {
	id: number
	title: string
	userId: number
}

type AlbumsState = {
	albums: AlbumsModel[]
}

export const albums = createModel<RootModel>()({
	state: {
		albums: [],
	} as AlbumsState,
	reducers: {
		SET_ALBUMS: (state: AlbumsState, albums: AlbumsModel[]) => {
			return {
				...state,
				albums,
			}
		},
	},
	effects: (dispatch) => {
		const { albums } = dispatch
		return {
			async getAlbums(): Promise<any> {
				const response: any = await client.get(
					'/albums'
				)
				const {data}: { data: AlbumsModel[] } = await response
				 // @ts-ignore
				albums.SET_ALBUMS(data)
			}
		}

	},
})
