import XMLSchema from '../';

describe('Fields', () =>
{
	it('should correctly append children', () =>
	{
		var xmlSchema = new XMLSchema({
			tag: "basic",
			fields: {
				key: {},
			},
		});

		expect(xmlSchema.generate({
			key: 'test',
		})).toBe(
			'<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>test</key></basic>',
		);
	});

	it('should correctly use specified tag', () =>
	{
		var xmlSchema = new XMLSchema({
			tag: "basic",
			fields: {
				key: {
					tag: 'test',
				},
			},
		});

		expect(xmlSchema.generate({
			key: 'hello',
		})).toBe(
			'<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><test>hello</test></basic>',
		);
	});

	it('should correctly handle "$"', () =>
	{
		var xmlSchema = new XMLSchema({
			tag: "basic",
			fields: {
				key: {
					fields: {
						'$': {
							tag: "key2",
							attributes: {
								message: {},
							},
						},
					},
				},
			},
		});

		expect(xmlSchema.generate({
			key: {
				message: "hello",
			},
		})).toBe(
			'<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key><key2 message="hello"/></key></basic>',
		);
	});

	it('should correctly transform value', () =>
	{
		var xmlSchema = new XMLSchema({
			tag: "basic",
			fields: {
				key: {
					transform(v) { return v as any + 1; },
				},
			},
		});

		expect(xmlSchema.generate({
			key: 1,
		})).toBe(
			'<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>2</key></basic>',
		);
	});

	it('should correctly append default fields', () =>
	{
		var xmlSchema = new XMLSchema({
			tag: "basic",
			fields: {
				key: {
					default: 'test',
				},
			},
		});

		expect(xmlSchema.generate()).toBe(
			'<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>test</key></basic>',
		);
	});

	it('should correctly append empty field for bool:true', () =>
	{
		var xmlSchema = new XMLSchema({
			tag: "basic",
			fields: {
				key: {
					bool: true,
				},
			},
		});

		expect(xmlSchema.generate()).toBe('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic/>');
		expect(xmlSchema.generate({ key: true })).toBe(
			'<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key/></basic>',
		);
	});
});
