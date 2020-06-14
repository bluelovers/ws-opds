import XMLSchema from '../';

describe('Attributes', () =>
{
	it('should correctly append attributes', () =>
	{
		var xmlSchema = new XMLSchema({
			tag: "basic",
			attributes: {
				key: {},
			},
		});

		expect(xmlSchema.generate({
			key: 'test',
		})).toBe(
			'<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key="test"/>',
		);
	});

	it('should correctly use specified name', () =>
	{
		var xmlSchema = new XMLSchema({
			tag: "basic",
			attributes: {
				key: { name: "key2" },
			},
		});

		expect(xmlSchema.generate({
			key: 'test',
		})).toBe(
			'<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key2="test"/>',
		);
	});

	it('should correctly transform value', () =>
	{
		var xmlSchema = new XMLSchema({
			tag: "basic",
			attributes: {
				key: { transform(v) { return v as any + 1; } },
			},
		});

		expect(xmlSchema.generate({
			key: 1,
		})).toBe('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key="2"/>');
	});

	it('should correctly default value', () =>
	{
		var xmlSchema = new XMLSchema({
			tag: "basic",
			attributes: {
				key: { default: 'test' },
			},
		});

		expect(xmlSchema.generate()).toBe(
			'<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key="test"/>',
		);
	});
});
