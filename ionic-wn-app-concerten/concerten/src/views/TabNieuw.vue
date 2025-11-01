<template>
    <ion-page>
        <ion-toolbar>
            <ion-header>
                <ion-title>Creation Page</ion-title>
            </ion-header>
        </ion-toolbar>

        <ion-content>
            <ion-list>
                <ion-title>Make a ticket</ion-title>
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

                <ion-button id="open-toast" expand="block" @click="postTicket()">Send</ion-button>
				<ion-toast trigger="open-toast" message="Ticket has successfully been made!" duration="5000"></ion-toast>
            </ion-list>
            <ion-title>Other options</ion-title>
                <ion-item>
                    <ion-label>Add a visitor</ion-label>
                    <ion-button id="open-toast" expand="block" @click="addOtherOption(1)">Add</ion-button>
                </ion-item>

                <ion-item>
                    <ion-label>Add a concert</ion-label>
                    <ion-button id="open-toast" expand="block" @click="addOtherOption(2)">Add</ion-button>
                </ion-item>
            <ion-list>

            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup>

const axios = inject('axios') // inject axios
import { ref, inject } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter, IonItem, IonSelect, IonSelectOption, IonList, IonButton, IonToast, IonLabel } from '@ionic/vue';

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

function addOtherOption(option){
    if (option == 1) {
        window.location.href = 'addvisitor';
    } else {
        window.location.href = 'addconcert';
    }
}

onIonViewWillEnter(() => {
	// we halen de producten op bij het laden van dit scherm
	// er zijn strategieën mogelijk om dit meer performant te cachen
	getProducten();
});

</script>