import { Link, useParams } from 'react-router-dom';
import type { Employee } from '../../types/employee';
import styles from './EmployeeProfile.module.css';
import Spinner from '../../components/Spinner';

interface EmployeeProfileProps {
	employees: Employee[];
	loading: boolean;
	error: string | null;
}

function EmployeeProfile({ employees, loading, error }: EmployeeProfileProps) {
	const { employeeId } = useParams();
	const employee = employees.find((item) => item.id === Number(employeeId));

	if (loading) {
		return <Spinner />;
	}
	if (error) {
		return <p>{error}</p>;
	}
	if (!employee) {
		return <p>Employee not found.</p>;
	}

	return (
		<section className={styles.profile}>
			<Link className={styles.back} to="/employees">
				{`Back to Employees`}
			</Link>
			<img
				className={styles.avatar}
				src={`https://i.pravatar.cc/150?u=${employee.id}`}
				alt={`${employee.firstName} ${employee.lastName}`}
			/>
			<h2 className={styles.name}>
				{employee.firstName} {employee.lastName}
			</h2>
			<p className={styles.role}>{employee.company.title}</p>
			<p className={styles.department}>{employee.company.department}</p>
			<p className={styles.email}>{employee.email}</p>
			<p className={styles.phone}>Phone: {employee.phone}</p>
		</section>
	);
}

export default EmployeeProfile;
