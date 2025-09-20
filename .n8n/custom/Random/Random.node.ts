import {
	INodeType,
	INodeTypeDescription,
	INodeExecutionData,
	IExecuteFunctions,
	NodeConnectionType,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		name: 'random',
		displayName: 'Random',
		group: ['transform'],
		version: 1,
		icon: 'file:randomNode.svg',
		description: 'True Random Number Generator',
		defaults: {
			name: 'Random',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 1,
				description: 'Valor minimo do numero inteiro aleatorio a ser gerado',
				required: true,
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 10,
				description: 'Valor maximo do numero inteiro aleatorio a ser gerado',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const min = this.getNodeParameter('min', i) as number;
			const max = this.getNodeParameter('max', i) as number;

			if (min > max) {
				return [
					[
						{
							json: {
								error: 'Min não pode ser maior que Max.',
								min,
								max,
							},
						},
					],
				];
			}

			const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

			try {
				const response = await this.helpers.request({
					method: 'GET',
					url,
				});

				returnData.push({
					json: {
						randomNumber: parseInt(response, 10),
						min,
						max,
					},
				});
			} catch (error) {
				returnData.push({
					json: {
						error: error.message || error,
						min,
						max,
					},
				});
			}
		}

		return [returnData];
	}
}
