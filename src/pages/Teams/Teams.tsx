import styles from './Teams.module.css';
import React, { useState } from 'react';
import type { Employee } from '../../types/employee';

interface TeamsProps {
	employees: Employee[];
}
interface Team {
	id: string;
	name: string;
	memberIds: number[];
}

//for localStorage
function readTeams() {
	const stored = localStorage.getItem('teams');
	if (!stored) {
		return [];
	}

	try {
		const parsed = JSON.parse(stored) as Team[];
		return parsed.map((team) => ({ ...team, memberIds: team.memberIds ?? [] }));
	} catch {
		return [];
	}
}

//----

function Teams({ employees }: TeamsProps) {
	const [teams, setTeams] = useState<Team[]>(readTeams);
	const [teamName, setTeamName] = useState('');

	function addTeam(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const trimmedName = teamName.trim();
		if (trimmedName === '') return;

		setTeams((current) => {
			const next = [...current, { id: crypto.randomUUID(), name: trimmedName, memberIds: [] }];
			localStorage.setItem('teams', JSON.stringify(next));
			return next;
		});
		setTeamName('');
	}

	function removeTeam(id: string) {
		setTeams((current) => {
			const next = current.filter((team) => team.id !== id);
			localStorage.setItem('teams', JSON.stringify(next));
			return next;
		});
	}

	function addMember(teamId: string, employeeId: number) {
		setTeams((current) => {
			const next = current.map((team) => {
				if (team.id !== teamId || team.memberIds.includes(employeeId)) {
					return team;
				}

				return { ...team, memberIds: [...team.memberIds, employeeId] };
			});

			localStorage.setItem('teams', JSON.stringify(next));
			return next;
		});
	}

	function removeMember(teamId: string, employeeId: number) {
		setTeams((current) => {
			const next = current.map((team) => {
				if (team.id !== teamId) {
					return team;
				}

				return {
					...team,
					memberIds: team.memberIds.filter((id) => id !== employeeId),
				};
			});

			localStorage.setItem('teams', JSON.stringify(next));
			return next;
		});
	}

	return (
		<section>
			<h2 className={styles.title}>Teams</h2>
			<form className={styles.form} onSubmit={addTeam}>
				<input
					type="text"
					className={styles.input}
					placeholder="Team name"
					value={teamName}
					onChange={(event) => setTeamName(event.target.value)}
				/>
				<button className={styles.button} type="submit">
					Add Team
				</button>
			</form>
			{teams.length === 0 ? (
				<p className={styles.empty}>No teams yet...</p>
			) : (
				<ul className={styles.list}>
					{teams.map((team) => (
						<li key={team.id} className={styles.row}>
							<div>
								<span className={styles.name}>{team.name}</span>
								<ul className={styles.members}>
									{team.memberIds.map((memberId) => {
										const employee = employees.find((item) => item.id === memberId);
										if (!employee) {
											return null;
										}

										return (
											<li key={memberId} className={styles.member}>
												<span>
													{employee.firstName} {employee.lastName}
												</span>
												<button
													className={styles.memberRemove}
													type="button"
													onClick={() => removeMember(team.id, memberId)}
												>
													Remove
												</button>
											</li>
										);
									})}
								</ul>
							</div>
							<div className={styles.actions}>
								<select
									className={styles.select}
									defaultValue=""
									onChange={(event) => {
										const employeeId = Number(event.target.value);
										if (employeeId === 0) {
											return;
										}

										addMember(team.id, employeeId);
										event.target.value = '';
									}}
								>
									<option value="">Add employee</option>
									{employees.map((employee) => (
										<option key={employee.id} value={employee.id}>
											{employee.firstName} {employee.lastName}
										</option>
									))}
								</select>
								<button className={styles.remove} type="button" onClick={() => removeTeam(team.id)}>
									Delete Team
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}

export default Teams;
