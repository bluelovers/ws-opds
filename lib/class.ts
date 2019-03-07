/**
 * Created by user on 2019/3/7.
 */

import { IParseOptions, JsonElementType, JsonObject, JsonProperty, JsonWriteonly, TaJson, BeforeDeserialized, OnDeserialized, JsonConstructor } from "ta-json-x";
import util = require('util');
import "reflect-metadata";
import SymbolInspect = require('symbol.inspect');

export namespace Schema
{
	export interface IBaseJSON
	{
		[k: string]: unknown
	}

	@JsonObject()
	export abstract class Base<D extends IBaseJSON = IBaseJSON>
	{

		constructor(...argv)
		{
			this._init(...argv);
		}

		@JsonConstructor()
		protected _init(...argv)
		{
			if (this.BeforeDeserialized)
			{
				this.BeforeDeserialized(...argv);
			}
		}

		@BeforeDeserialized()
		protected BeforeDeserialized(...argv){};

		stringify(pretty?: boolean | string): string
		{
			if (pretty === false)
			{
				pretty = '';
			}

			if (typeof pretty !== 'string')
			{
				pretty = '\t';
			}

			return JSON.stringify(this.serialize(), null, pretty);
		}

		serialize<T extends D | IBaseJSON>(): T
		{
			return TaJson.serialize(this);
		}

		static deserialize<T extends Base, J extends IBaseJSON = Partial<{
			[k in keyof T]?: T[k]
		}>>(json: J, options?: IParseOptions): T
		{
			return TaJson.deserialize<T>(json, this, options);
		}

		static parse<T extends Base>(json: string, options?: IParseOptions): T
		{
			return TaJson.parse<T>(json, this, options)
		}

	}
}

export default exports as typeof import('./class');
