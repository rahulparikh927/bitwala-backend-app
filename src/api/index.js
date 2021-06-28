import { Router } from 'express';
import blockchain from './blockchain';

export default ({ config }) => {
	let api = Router();

	// mount the facets resource
	api.use('/blockchain', blockchain);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.send("/api");
	});
	return api;
}
