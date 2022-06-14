import { Models } from '@rematch/core'
import { albums } from './albums'
import { photos } from './photos'

export interface RootModel extends Models<RootModel> {
	albums: typeof albums
	photos: typeof photos
}

export const models: RootModel = { albums, photos }
