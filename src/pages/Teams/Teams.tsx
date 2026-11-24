import styles from './Teams.module.css';

function Teams() {
	return (
		<section>
			<h2 className={styles.title}>Teams</h2>
			<p className={styles.empty}>No teams yet.</p>
		</section>
	);
}

export default Teams;
