<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Visitor</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Visitor</ion-title>
				</ion-toolbar>
			</ion-header>

			<!-- We zorgen er hier voor dat de PR_ID getoond wordt 'on hover' -->
			<!-- Kan je de product categorie id tonen wanneer over de categorienaam wordt 'gehoverd' ?-->
			<ion-list>
				<ion-item><b>First Name: &nbsp;</b>{{bezoekerData.first_name}}</ion-item>
                <ion-item><b>Last Name: &nbsp;</b>{{bezoekerData.last_name}}</ion-item>
                <ion-item><b>Birth Date: &nbsp;</b>{{bezoekerData.birth_date}}</ion-item>
                <ion-item><b>Email: &nbsp;</b>{{bezoekerData.email}}</ion-item>
			</ion-list>
            <ion-title>Concerts</ion-title>
            <ion-list>
				<ion-item v-for="{ id, artist, date, price } in bezoekerConcerten" :key="id">
					<ion-label>€{{ price }}</ion-label>
					<ion-label :title="id">{{ artist }}</ion-label>
					<ion-label>{{ date }}</ion-label>
				</ion-item>

			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { ref, inject } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, onIonViewWillEnter, IonItem, IonLabel } from '@ionic/vue';

const id = localStorage.getItem('id');
const bezoekerData = ref([]);
const bezoekerConcerten = ref([]);

const axios = inject('axios') // inject axios
const getProducten = () => {
	axios
		.get(`https://makoun.be/LiveCountry/api/bezoekers.php?id=${id}`)
		.then(response => {
			// controleer de response
			if (response.status !== 200) {
				// er is iets fout gegaan, doe iets met deze info
				console.log(response.status);
			}
			if (!response.data.data) {
				// De data die we verwachten zit niet in response.data :
				// de aangesproken API stopt zijn data in een data object (eigen code).
				// Deze data zit echter ook in het data object in response.
				// Daarom dus response.data.data
				console.log('response.data.data is not ok');
				return;
			}
			console.log(response.data);
            console.log(response.data.data.id);
            bezoekerData.value = response.data.data;
			// We gaan eerst de lijst leeg maken, een beetje ruw, maar werkt op dit moment
		});
}

const getBezoekerConcerten = () => {
	axios
		.get(`https://makoun.be/LiveCountry/api/tickets.php?bezoeker_id=${id}`)
		.then(response => {
			// controleer de response
			if (response.status !== 200) {
				// er is iets fout gegaan, doe iets met deze info
				console.log(response.status);
			}
			if (!response.data.data) {
				// De data die we verwachten zit niet in response.data :
				// de aangesproken API stopt zijn data in een data object (eigen code).
				// Deze data zit echter ook in het data object in response.
				// Daarom dus response.data.data
				console.log('response.data.data is not ok');
				return;
			}
			console.log(response.data);
            bezoekerConcerten.value = response.data.data;
			// We gaan eerst de lijst leeg maken, een beetje ruw, maar werkt op dit moment
		});
}

onIonViewWillEnter(() => {
	// we halen de producten op bij het laden van dit scherm
	// er zijn strategieën mogelijk om dit meer performant te cachen
	getProducten();
    getBezoekerConcerten();
});
</script>