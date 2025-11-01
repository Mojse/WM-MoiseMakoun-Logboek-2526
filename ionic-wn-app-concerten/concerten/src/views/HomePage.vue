<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>LiveCountry</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Tab 2</ion-title>
				</ion-toolbar>
			</ion-header>

			<!-- We zorgen er hier voor dat de PR_ID getoond wordt 'on hover' -->
			<!-- Kan je de product categorie id tonen wanneer over de categorienaam wordt 'gehoverd' ?-->
			<ion-list>
				<ion-title>Concerten</ion-title>
				<ion-item v-for="{ id, artist, date, price } in concerten" :key="id">
					<ion-item slot="start">€{{ price }}</ion-item>
					<ion-label :title="id">{{ artist }}</ion-label>
					<ion-item>{{ date }}</ion-item>
					<ion-button id="open-toast" expand="block" @click="goToDetails(id, 1)">Details</ion-button>
					<ion-button id="open-toast" expand="block" @click="goToEdit(id, 1)">Edit</ion-button>
					<ion-button id="open-toast" expand="block" @click="deleteSelected(id, 1)">Delete</ion-button>
				</ion-item>

			</ion-list>
		</ion-content>
		<ion-content :fullscreen="false">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Tab 2</ion-title>
				</ion-toolbar>
			</ion-header>

			<!-- We zorgen er hier voor dat de PR_ID getoond wordt 'on hover' -->
			<!-- Kan je de product categorie id tonen wanneer over de categorienaam wordt 'gehoverd' ?-->
			<ion-list>
				<ion-title>Bezoekers</ion-title>
				<ion-item v-for="{ id, first_name, last_name, email } in bezoekers" :key="id">
					<ion-item slot="start">{{ first_name }}</ion-item>
					<ion-label :title="id">{{ last_name }}</ion-label>
					<ion-item>{{ email }}</ion-item>
					<ion-button id="open-toast" expand="block" @click="goToDetails(id, 2)">Details</ion-button>
					<ion-button id="open-toast" expand="block" @click="goToEdit(id, 2)">Edit</ion-button>
					<ion-button id="open-toast" expand="block" @click="deleteSelected(id, 2)">Delete</ion-button>
				</ion-item>

			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { ref, inject } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, onIonViewWillEnter, IonButton } from '@ionic/vue';

const concerten = ref([]);
const bezoekers = ref([]);

const delay = ms => new Promise(res => setTimeout(res, ms));

const axios = inject('axios') // inject axios
const getProducten = () => {
	axios
		.get('https://makoun.be/LiveCountry/api/concerten.php')
		.then(response => {
			if (response.status !== 200) {
				console.log(response.status);
			}
			if (!response.data.data) {
				console.log('response.data.data is not ok');
				return;
			}
			console.log(response.data);
			concerten.value = [];
			for (let i = 0, end = response.data.data.length; i < end; i++) {
				concerten.value.push(response.data.data[i]);
			}
			console.log("Concerten :");
			console.log(concerten.value);
		});
	axios
		.get('https://makoun.be/LiveCountry/api/bezoekers.php')
		.then(response => {
			if (response.status !== 200) {
				console.log(response.status);
			}
			if (!response.data.data) {
				console.log('response.data.data is not ok');
				return;
			}
			console.log(response.data);
			bezoekers.value = [];
			for (let i = 0, end = response.data.data.length; i < end; i++) {
				bezoekers.value.push(response.data.data[i]);
			}
			console.log("Bezoekers :");
			console.log(bezoekers.value);
		});
}
onIonViewWillEnter(() => {
	// we halen de producten op bij het laden van dit scherm
	// er zijn strategieën mogelijk om dit meer performant te cachen
	getProducten();
});

function goToDetails(id, type){
	console.log(id);
	console.log(`type: ${type}`);
	localStorage.setItem('id', id);
	if (type == 1) {
		window.location.href = 'concertDetails';
	} else {
		window.location.href = 'visitorDetails';
	}
}

async function deleteSelected(id, type){
	console.log(id);
	let url = '';
		if (type == 1) {
			url = `https://makoun.be/LiveCountry/api/concerten.php?id=${id}`;
		} else {
			url = `https://makoun.be/LiveCountry/api/bezoekers.php?id=${id}`;
		}
	axios
		.delete(url)
		.then(response => {
			if (response.status !== 200) {
				console.log(response.status);
			}
			if (!response.data.data) {
				console.log('response.data.data is not ok');
				return;
			}
		});
	// deze delay doe zet ik er bij omdat hij anders niet genoeg tijd heeft voor de delete uit te voeren voor de refresh denk ik (het werkt alleszins)
	// code voor delay van https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
	await delay(1000);
	window.location.href = 'home';
}

function goToEdit(id, type){
	console.log(id);
	localStorage.setItem('id', id);
	localStorage.setItem('edit', 'true');
	if (type == 1) {
		window.location.href = 'addConcert';
	} else {
		window.location.href = 'addVisitor';
	}
}

</script>