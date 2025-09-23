import { Random } from '../Random.node';

describe('Random Node', () => {
	let node: Random;

	beforeEach(() => {
		node = new Random();
	});

	it('deve retornar erro se min > max', async () => {
		const context: any = {
			getInputData: () => [{}],
			getNodeParameter: (name: string) => (name === 'min' ? 10 : 1),
			helpers: { request: jest.fn() },
		};

		const result = await node.execute.call(context);

		expect(result[0][0].json.error).toMatch(/Min não pode ser maior que Max/);
		expect(result[0][0].json.min).toBe(10);
		expect(result[0][0].json.max).toBe(1);
	});

	it('deve retornar erro se min ou max nao forem inteiros', async () => {
		const context: any = {
			getInputData: () => [{}],
			getNodeParameter: (name: string) => (name === 'min' ? 1.5 : 10),
			helpers: { request: jest.fn() },
		};

		const result = await node.execute.call(context);

		expect(result[0][0].json.error).toMatch(/Min e Max devem ser números inteiros/);
		expect(result[0][0].json.min).toBe(1.5);
		expect(result[0][0].json.max).toBe(10);
	});

	it('deve gerar numero aleatorio dentro do intervalo', async () => {
		const context: any = {
			getInputData: () => [{}],
			getNodeParameter: (name: string) => (name === 'min' ? 1 : 10),
			helpers: { request: jest.fn().mockResolvedValue('7') },
		};

		const result = await node.execute.call(context);

		const randomNumber = result[0][0].json.randomNumber;
		expect(randomNumber).toBeGreaterThanOrEqual(1);
		expect(randomNumber).toBeLessThanOrEqual(10);
	});
});
