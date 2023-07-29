const { Client, GatewayIntentBits, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { configDotenv } = require('dotenv');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

configDotenv();

const express = require('express');
const app = express();
app.use(express.json());

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const link = client.generateInvite({
        permissions: [
            PermissionsBitField.Flags.SendMessages
        ],
        scopes: ['bot'],
    });
    console.log(`Generated bot invite link: ${link}`);
});

app.post('/trucky/webhook', async (req, res) => {
    console.log(req.body);

    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
    if (channel) {
        const truckyEvent = req.body;
        const data = truckyEvent.data;

        channel.send(truckyEvent.event);

        if (truckyEvent.event == 'job_created') {
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`Job Started - #${data.id}`)
                .setAuthor({ name: data.driver.name, iconURL: data.driver.avatar_url })
                .addFields(
                    { name: 'Source', value: `${data.source_city_name} - ${data.source_company_name}` },
                    { name: 'Destination', value: `${data.destination_city_name} - ${data.destination_company_name}` },
                    { name: 'Cargo', value: `${data.cargo_name} (${data.cargo_mass} ${data.weight_unit})` },
                    { name: 'Planned Distance', value: `${data.planned_distance} ${data.distance_unit}` },
                )
                .setTimestamp()
                .setFooter({ text: 'Sent from Trucky VTC Hub' });

            channel.send({ embeds: [exampleEmbed] });
        }
    }
});

app.get('/', async (req, res) => {
    res.send('Is Alive!');
});

app.listen(process.env.PORT, () => {
    console.log(`Web server is listening on ${process.env.PORT}`);
});

client.login(process.env.TOKEN);
