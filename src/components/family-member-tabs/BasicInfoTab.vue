<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Osobní údaje</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <div><strong>Jméno:</strong> Jan</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Příjmení:</strong> Novák</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Rodné příjmení:</strong> Horák</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Datum narození:</strong> 01.01.1990</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Místo narození:</strong> Praha</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Čas narození:</strong> 08:30</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Pohlaví:</strong> Muž</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Náboženství:</strong> Křesťanství</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Informace o úmrtí -->
        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Informace o úmrtí</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <div><strong>Datum úmrtí:</strong> 15.05.2050</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Čas úmrtí:</strong> 23:45</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Místo úmrtí:</strong> Brno</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Příčina smrti:</strong> Přírodní příčiny</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Datum pohřbu:</strong> 17.05.2050</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Místo pohřbu:</strong> Krematorium Praha</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div><strong>Místo pochování:</strong> Hřbitov Olšany</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Příbuzní</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <a href="https://example.com/petr-novak" target="_blank">Petra Nováková (matka)</a>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <a href="https://example.com/petr-novak" target="_blank">Petr Novák (otec)</a>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <a href="https://example.com/petr-novak" target="_blank">Petr Novák (potomek)</a>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <a href="https://example.com/klara-novakova" target="_blank">Klára Nováková (potomek)</a>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <a href="https://example.com/adam-novak" target="_blank">Adam Novák (sourozenec)</a>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <a href="https://example.com/lucie-novakova" target="_blank">Lucie Nováková (sourozenec)</a>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <a href="https://example.com/martin-novak" target="_blank">Martin Novák (prarodič)</a>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <a href="https://example.com/jana-novakova" target="_blank">Jana Nováková (prarodič)</a>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Manželství</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <div><strong>Partner:</strong> Eva Nováková</div>
                      <div><strong>Datum sňatku:</strong> 12.06.2010</div>
                      <div><strong>Rozvod:</strong> 2018</div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Vzdělání</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <div><strong>Název:</strong> Základní škola Květen</div>
                      <div><strong>Adresa:</strong> Ulice 1, Praha</div>
                      <div><strong>Období:</strong> 1996 – 2002</div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <div><strong>Název:</strong> Gymnázium Slunce</div>
                      <div><strong>Adresa:</strong> Ulice 2, Brno</div>
                      <div><strong>Období:</strong> 2002 – 2006</div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Zaměstnání a profese</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <div><strong>Název společnosti:</strong> IT Solutions</div>
                      <div><strong>Adresa:</strong> Tech Park, Praha</div>
                      <div><strong>Období:</strong> 2008 – 2015</div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <div><strong>Název společnosti:</strong> Web Innovators</div>
                      <div><strong>Adresa:</strong> Centrum, Brno</div>
                      <div><strong>Období:</strong> 2015 – současnost</div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <div><strong>Profese:</strong> Programátor, IT konzultant</div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Adresy pobytu</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Praha, Česká republika</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Brno, Česká republika</v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Koníčky a zájmy</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>Čtení, sport, hudba, cestování</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Krátký popis osoby</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>
                  Jan je charismatická osobnost s bohatou historií, která zanechala stopu ve všech oblastech svého života.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Krátký vzkaz</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>Tady je krátký vzkaz, který vyjadřuje životní filozofii.</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Podpis</v-card-title>
              <v-divider></v-divider>
              <v-card-text class="flex justify-center">
                <v-img src="https://example.com/signature.png" max-width="200" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="mb-4" outlined>
              <v-card-title class="text-h5 font-bold">Další údaje</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <p>
                  Zde mohou být libovolné údaje, které si uživatel sám vytvořil při vytváření osoby.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
