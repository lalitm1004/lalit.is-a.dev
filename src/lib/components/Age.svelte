<script lang="ts">
    let age:number;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthYear = 2005;
    const birthMonth = 3;
    const birthDay = 10;

    age = currentYear - birthYear;
    if (currentDate.getMonth() < birthMonth || (currentDate.getMonth() == birthMonth && currentDate.getDate() < birthDay))
        age--;
</script>

<span>{age}</span>