import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import type { Employee } from '../types/employee';
import styles from './Sidebar.module.css';

interface SidebarProps {
	employees: Employee[];
	department: string;
	onDepartmentChange: (department: string) => void;
}

function Sidebar({ employees, department, onDepartmentChange }: SidebarProps) {
	const navigate = useNavigate();
	const [open, setOpen] = useState(true);
	const departments = [...new Set(employees.map((employee) => employee.company.department))].sort();

	function selectDepartment(nextDepartment: string) {
		onDepartmentChange(nextDepartment);
		navigate('/employees');
	}

	return (
		<nav className={styles.sidebar}>
			<NavLink
				to="/"
				className={({ isActive }) => (isActive ? styles.active : styles.link)}
				onClick={() => onDepartmentChange('all')}
			>
				Dashboard
			</NavLink>

			<div>
				<div className={styles.employees}>
					<button type="button" className={styles.employeesLabel} onClick={() => selectDepartment('all')}>
						Employees
					</button>
					<button
						type="button"
						className={open ? styles.chevronOpen : styles.chevron}
						aria-expanded={open}
						aria-label="Toggle departments"
						onClick={() => setOpen((current) => !current)}
					/>
				</div>

				<div className={open ? styles.panelOpen : styles.panel}>
					<div className={styles.panelInner}>
						<ul className={styles.departments}>
							{departments.map((departmentName) => {
								const count = employees.filter(
									(employee) => employee.company.department === departmentName,
								).length;

								return (
									<li key={departmentName}>
										<button
											type="button"
											className={
												department === departmentName
													? styles.departmentActive
													: styles.department
											}
											onClick={() => selectDepartment(departmentName)}
										>
											<span>{departmentName}</span>
											<span>{count}</span>
										</button>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Sidebar;
