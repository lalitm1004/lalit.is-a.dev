<script>
    const birthDate = new Date(2005, 3, 10); // April 10 2005
    
    const age = $derived.by(() => {
        const today = new Date();
        const isBeforeBirthday =
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());

        const ageCorrection = isBeforeBirthday ? -1 : 0;

        return today.getFullYear() - birthDate.getFullYear() + ageCorrection;
    });
</script>

<span>{age}</span>