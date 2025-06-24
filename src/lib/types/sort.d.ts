export type State<T extends string> = T;

export interface BaseBarItem<T extends State<string>> {
	value: number;
	state: T;
	id: string;
}
