import styles from './EmployeeCard.module.css';
import type { Employee } from '../types/employee';

interface EmployeeCardProps {
	employee: Employee;
}

function EmployeeCard({ employee }: EmployeeCardProps) {
	return (
		<article className={styles.card}>
			<img
				className={styles.avatar}
				src={`https://i.pravatar.cc/150?u=${employee.id}`}
				alt={`${employee.firstName} ${employee.lastName}`}
			/>
			<div>
				<h3 className={styles.name}>
					{employee.firstName} {employee.lastName}
				</h3>
				<p className={styles.role}>{employee.company.title}</p>
				<p className={styles.department}>{employee.company.department}</p>
			</div>
		</article>
	);
}

export default EmployeeCard;
