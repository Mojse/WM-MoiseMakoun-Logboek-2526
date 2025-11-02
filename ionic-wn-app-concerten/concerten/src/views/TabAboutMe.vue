<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>About me</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">About me</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-item>
                <div class="container">
                    <div class="text">
                        <h2>Over deze app</h2>
                        <p>LiveCountry is een hybride app waarmee je concerten, bezoekers en tickets kunt beheren. Een beetje zoals LiveNation, maar op maat gemaakt voor dit project.
                        De app is ontwikkeld met Ionic en Vue, en communiceert met een RESTful API om gegevens dynamisch op te halen en te bewaren.</p>
                        
                        <h3>Functionaliteiten</h3>
                        <ul>
                            <li>Concerten toevoegen, aanpassen en verwijderen</li>
                            <li>Bezoekers toevoegen, aanpassen en verwijderen</li>
                            <li>Tickets aanmaken: één bezoeker kan tickets kopen voor meerdere concerten</li>
                            <li>Gebruiksvriendelijke formulieren met validatie</li>
                            <li>Duidelijke layout met standaard Ionic-componenten</li>
                            <li>Geen zichtbare ID’s voor de gebruiker</li>
                            <li>Correcte navigatie tussen schermen</li>
                            <li>Verbinding met een externe REST API</li>
                        </ul>

                        <h3>Technisch</h3>
                        <ul>
                            <li>Frameworks: Ionic + Vue</li>
                            <li>Router: Vue Router</li>
                            <li>API: eigen RESTful API voor concerten, bezoekers en tickets</li>
                            <li>Build: Android debug APK toegevoegd</li>
                            <li>Demo: filmpje opgenomen van emulator of toestel in de map /demo</li>
                            <li>Extra uitleg in logboek.md</li>
                        </ul>

                        <h2>Over de ontwikkelaar</h2>
                        <ul>
                            <li>Naam: Moïse Makoun</li>
                            <li>Opleiding: 2de jaar toegepaste informatica => Odisee Brussel</li>
                            <li>Leeftijd: 19 jaar</li>
                            <li>Weetjes: Charmant, intelligent, grappig, houdt van Tresor cornflakes</li>
                        </ul>
                    </div>
                    <img src="/public/picture.jpeg" alt="picture">
                </div>
            </ion-item>
           

		</ion-content>
	</ion-page>
</template>

<script setup>

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem } from '@ionic/vue';

</script>

<style>

</style>