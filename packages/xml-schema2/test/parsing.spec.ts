import XMLSchema from '../';

describe('Parsing', () =>
{
	describe('Attrbiutes', () =>
	{
		it('should correctly extract from root', () =>
		{
			var xmlSchema = new XMLSchema({
				tag: "basic",
				attributes: {
					key: {},
				},
			});

			expect(
				xmlSchema.parse('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key="test"/>'),
			).toEqual({ key: "test" });
		});

		it('should correctly use specified name', () =>
		{
			var xmlSchema = new XMLSchema({
				tag: "basic",
				attributes: {
					key: { name: "key2" },
				},
			});

			expect(
				xmlSchema.parse('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic key2="test"/>'),
			).toEqual({ key: "test" });
		});

	});

	describe('Fields', () =>
	{
		it('should correctly parse children', () =>
		{
			var xmlSchema = new XMLSchema({
				tag: "basic",
				fields: {
					key: {},
				},
			});

			expect(
				xmlSchema.parse('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>test</key></basic>'),
			).toEqual({ key: "test" });
		});

		it('should correctly parse array children', () =>
		{
			var xmlSchema = new XMLSchema({
				tag: "basic",
				fields: {
					key: {},
				},
			});

			expect(
				xmlSchema.parse('<?xml version="1.0" encoding="UTF-8" standalone="no"?><basic><key>test 1</key><key>test 2</key></basic>'),
			).toEqual({ key: ["test 1", "test 2"] });
		});
	});

});
