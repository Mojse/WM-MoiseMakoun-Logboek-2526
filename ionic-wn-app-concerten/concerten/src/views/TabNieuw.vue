<template>
    <ion-page>
        <ion-toolbar>
            <ion-header>
                <ion-title>Creation Page</ion-title>
            </ion-header>
        </ion-toolbar>

        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-select label="Bezoeker" label-placement="floating" v-model="selectedVisitor">
                    <ion-select-option v-for="{ id, first_name, last_name } in bezoekers" :key="id" :value="id">{{first_name}} {{last_name}}</ion-select-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-select label="Concerten" label-placement="floating" v-model="selectedConcert">
                    <ion-select-option v-for="{ id, artist, date } in concerten" :key="id" :value="id">{{artist}}: {{date}}</ion-select-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-button id="open-toast" expand="block" @click="postTicket()">Send</ion-button>
				    <ion-toast trigger="open-toast" message="Ticket has successfully been made!" duration="5000"></ion-toast>
                </ion-item>
        </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup>

const axios = inject('axios') // inject axios
import { ref, inject } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter, IonItem, IonSelect, IonSelectOption, IonList, IonButton, IonToast } from '@ionic/vue';

const concerten = ref([]);
const bezoekers = ref([]);
const selectedConcert = ref('');
const selectedVisitor = ref('');

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

const postTicket = () => {
    console.log(selectedConcert.value);
    console.log(selectedVisitor.value);
	axios
		.post(`https://makoun.be/LiveCountry/api/tickets.php`, {
			bezoeker_id: selectedVisitor.value,
			concert_id: selectedConcert.value,
		})
		.then(response => {
			// controleer de response
			console.log(response);
			if (response.status !== 200) {
				// TODO: er is iets fout gegaan, doe iets met deze info
				// mogelijk met https://ionicframework.com/docs/api/toast
				console.log(response.status);
			} else {
				// maak de velden leeg
				selectedVisitor.value = '';
				selectedConcert.value = '';
				//TODO: Bevestig dat het product is toegevoegd
				// mogelijk met https://ionicframework.com/docs/api/toast
			}
		});
}

onIonViewWillEnter(() => {
	// we halen de producten op bij het laden van dit scherm
	// er zijn strategieën mogelijk om dit meer performant te cachen
	getProducten();
});

</script>