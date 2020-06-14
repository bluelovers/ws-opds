import XMLSchema from '../';

describe('Basic', () =>
{
	var xmlSchema = new XMLSchema({
		tag: "basic",
	});

	it('should return an empty feed', () =>
	{
		expect(xmlSchema.generate()).toBe('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic/>');
	});
});
