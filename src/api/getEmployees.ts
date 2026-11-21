import type { Employee } from '../types/employee';

const responseStyle =
	'color: #fff; background:#9307ca; font-weight: bolder; font-size: 1.2em; padding: 3px 6px; border-radius: 5px;text-shadow: 1px 1px 0 #000, 1px 1px 0 #000;';

interface EmployeesResponse {
	users: Employee[];
}

export async function getEmployees(): Promise<Employee[]> {
	const response = await fetch('https://dummyjson.com/users?limit=208');
	if (!response.ok) {
		throw new Error('Failed to load employees!');
	}

	const data: EmployeesResponse = await response.json();
	console.log('%c---Data---', responseStyle, data);
	return data.users;
}
